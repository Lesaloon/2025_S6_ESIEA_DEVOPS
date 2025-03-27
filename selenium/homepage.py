from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

class HomePage():

    def __init__(self, webDriver):
        self.browser = webDriver
        self.wait = WebDriverWait(self.browser, timeout=20)

    def verify_element_text(self, id, expected_text):
        """
        Wait for an element by id and verify its text contains the expected text.
        """
        element = self.wait.until(EC.presence_of_element_located((By.ID, id)))
        assert expected_text in element.text, f"Expected text '{expected_text}' not found in '{element.text}'"
        return element

    def verify_element_exists(self, id):
        """
        Wait for an element by id and verify it exists.
        """
        element = self.wait.until(EC.presence_of_element_located((By.ID, id)))
        assert element is not None, f"Element not found using id '{id}'"
        return element

    def verify_element_children(self, id, expected_children):
        """
        Wait for an element by id and verify it has the expected number of children.
        """
        element = self.wait.until(EC.presence_of_element_located((By.ID, id)))
        children = self.wait.until(EC.presence_of_all_elements_located((By.XPATH, f"//*[@id='{id}']/*")))
        assert len(children) == expected_children, f"Expected {expected_children} children, found {len(children)}"
        return element

    def wait_for_element(self, id):
        """
        Wait for an element to be present in the DOM.
        """
        return self.wait.until(EC.presence_of_element_located((By.ID, id)))

    def clean(self):
        """
        Clean up the browser instance.
        """
        self.browser.close()
        self.browser.quit()