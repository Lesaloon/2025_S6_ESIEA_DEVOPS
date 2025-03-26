from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

class HomePage(): 

    def __init__(self, webDriver):
        self.browser = webDriver
        self.wait = WebDriverWait(self.browser, timeout=20)

    def verify_element_text(self, id, expected_text):
        """
        Find an element by id and verify its text contains the expected text.
        
        Args:
            id (str): The id to locate the element
            expected_text (str): The text expected to be in the element
            
        Returns:
            The element if assertion passes
            
        Raises:
            AssertionError: If the element's text doesn't contain the expected text
        """
        element = self.browser.find_element(By.ID, id)
        assert expected_text in element.text, f"Expected text '{expected_text}' not found in '{element.text}'"
        return element
    
    def verify_element_exists(self, id):
        """
        Find an element by id and verify it exists.
        
        Args:
            id (str): The id to locate the element
            
        Returns:
            The element if assertion passes
            
        Raises:
            AssertionError: If the element doesn't exist
        """
        element = self.browser.find_element(By.ID, id)
        assert element, f"Element not found using id '{id}'"
        return element
    
    def verify_element_children(self, id, expected_children):
        """
        Find an element by id and verify it has the expected number of children.
        
        Args:
            id (str): The id to locate the element
            expected_children (int): The number of children expected
            
        Returns:
            The element if assertion passes
            
        Raises:
            AssertionError: If the element doesn't have the expected number of children
        """
        element = self.browser.find_element(By.ID, id)
        children = element.find_elements(By.XPATH, "./*")
        assert len(children) == expected_children, f"Expected {expected_children} children, found {len(children)}"
        return element

    def wait_for_element(self, id):
        """
        Wait for an element to be present in the DOM.
        
        Args:
            id (str): The ID of the element to wait for
            
        Returns:
            The element if it is present
            
        Raises:
            TimeoutException: If the element is not present after 20 seconds
        """
        element = self.wait.until(EC.presence_of_element_located((By.ID, id)))
        return element    
    
    def clean(self):
        self.browser.close()
        self.browser.quit()