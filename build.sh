#!/bin/bash
set -e

usage() {
    cat <<EOF
Usage: $0 [OPTIONS]

Options:
  --compose         Après la construction et le push des images, lance docker compose
                    avec le fichier d'environnement ./backend/.env.
  -logs             Affiche les logs lors de docker buildx. Sinon, les logs sont masqués.
  --help, -h        Affiche ce message d'aide.

Exemples:
  $0                # Construit et pousse les images.
  $0 --compose      # Construit, pousse les images et lance docker compose.
  $0 -logs          # Construit et pousse les images en affichant les logs de buildx.
EOF
}

COMPOSE_FLAG=false
LOGS_FLAG=false

while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --compose)
            COMPOSE_FLAG=true
            ;;
        -logs)
            LOGS_FLAG=true
            ;;
        --help|-h)
            usage
            exit 0
            ;;
        *)
            echo "Option inconnue: $1"
            usage
            exit 1
            ;;
    esac
    shift
done

if ! docker buildx version &> /dev/null; then
    echo "Erreur: docker buildx n'est pas disponible. Veuillez l'installer ou activer le support Buildx dans Docker."
    exit 1
fi

BUILDER_NAME="buildx_temp_$(date +%s)"
echo "Création et utilisation du builder buildx..."
docker buildx create --name "$BUILDER_NAME" --use

echo "Construction et push de l'image maelmichaud/node-backend:latest..."
pushd ./backend > /dev/null
if [ "$LOGS_FLAG" = true ]; then
    docker buildx build --platform linux/amd64,linux/arm64 -t maelmichaud/node-backend:latest --push .
else
    docker buildx build --platform linux/amd64,linux/arm64 -t maelmichaud/node-backend:latest --push . > /dev/null 2>&1
fi
popd > /dev/null

echo "Construction et push de l'image maelmichaud/react-frontend:latest..."
pushd ./frontend > /dev/null
if [ "$LOGS_FLAG" = true ]; then
    docker buildx build --platform linux/amd64,linux/arm64 -t maelmichaud/react-frontend:latest --push .
else
    docker buildx build --platform linux/amd64,linux/arm64 -t maelmichaud/react-frontend:latest --push . > /dev/null 2>&1
fi
popd > /dev/null

if [ "$COMPOSE_FLAG" = true ]; then
    if ! docker compose version &> /dev/null; then
        echo "Erreur: docker compose n'est pas disponible. Veuillez l'installer."
        exit 1
    fi
    echo "Lancement de docker compose avec le fichier d'environnement ./backend/.env..."
    docker compose --env-file ./backend/.env up -d --build
fi

echo "Opération terminée avec succès."
echo "Voici la liste des conteneurs actifs:"
docker ps

echo "Suppression du builder buildx $BUILDER_NAME..."
docker buildx rm "$BUILDER_NAME"