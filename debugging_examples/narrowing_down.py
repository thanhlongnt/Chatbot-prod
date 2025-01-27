# Step 1: Original Code (Suspected Bug in Framework)
import pandas as pd

def process_data(file_path):
    """
    Processes a CSV file and calculates the mean of a specific column.
    """
    print("Reading data...")
    data = pd.read_csv(file_path)
    print(f"Data read successfully:\n{data.head()}")
    
    print("Calculating mean of column 'value'...")
    mean_value = data['value'].mean()
    print(f"Mean value: {mean_value}")
    return mean_value

# Test the original function with a sample file
try:
    result = process_data("sample.csv")  # Assume sample.csv is provided
    print(f"Processed result: {result}")
except Exception as e:
    print(f"Error encountered: {e}")


# Step 2: Replace Framework Code with a Mock Module
def mock_read_csv(file_path):
    """
    Mock version of pd.read_csv that simulates data reading.
    """
    print(f"Mock read_csv called with file_path: {file_path}")
    # Simulate a correct dataset
    mock_data = {
        "value": [1, 2, 3, 4, 5]
    }
    print(f"Mock data returned:\n{mock_data}")
    return pd.DataFrame(mock_data)

# Monkey-patch the pandas read_csv function with the mock version
pd.read_csv = mock_read_csv

# Test the function with the mock module
print("\n--- Testing with Mock Module ---")
try:
    result = process_data("sample.csv")
    print(f"Processed result with mock: {result}")
except Exception as e:
    print(f"Error with mock module: {e}")


# Step 3: Narrow Down the Bug with a Broken Example
# Create a small broken example to test if the bug is in the framework or logic
print("\n--- Testing Framework with Minimal Example ---")
try:
    # Deliberately create a broken example to test the framework
    broken_data = pd.DataFrame({"value": [None, None, None]})
    print(f"Broken data:\n{broken_data}")
    mean_value = broken_data['value'].mean()
    print(f"Mean value of broken data: {mean_value}")
except Exception as e:
    print(f"Framework bug detected: {e}")


# Step 4: Debug or Report Framework Bug
# (If framework is confirmed as the issue)
print("\n--- Last Resort: Debug into Framework ---")
# If a bug in the framework is suspected, use debugging tools or step through the framework code
# e.g., Use a debugger to examine internal calls in pd.read_csv or pd.DataFrame.mean
