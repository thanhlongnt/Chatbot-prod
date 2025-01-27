# Binary Search Function
def binary_search(arr, target):
    """
    Perform binary search on a sorted array to find the target.
    Returns the index of the target if found, otherwise -1.
    """
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Problematic Test Case
# Initial large input where the function fails
arr = [1, 3, 3, 5, 7, 9, 11, 13]
target = 6
result = binary_search(arr, target)  # Expected: -1 (target not found), but it fails
print(f"Original Test Case: {result}")

# Step 1: Minimize the Input
# Start by testing smaller subsets of the array while retaining the error.
# Subset 1
arr = [5, 7]
target = 6
result = binary_search(arr, target)  # Does it still fail?
print(f"Minimized Test Case 1: {result}")  # Output should indicate if the issue persists.

# Subset 2
arr = [3, 5, 7]
target = 6
result = binary_search(arr, target)  # Does it still fail?
print(f"Minimized Test Case 2: {result}")  # Output should indicate if the issue persists.

# Step 2: Identify the Minimal Failing Input
# Further reduce the test case to the smallest size where the bug is still reproducible.
arr = [5, 7]
target = 6
result = binary_search(arr, target)  # Final minimal failing test case
print(f"Final Minimized Test Case: {result}")  # Expected: -1, but function may fail.

# Step 3: Debugging the Issue
# Analyze the function behavior with the minimal test case to locate the bug.
# In this example, if the function returns 0 (index of 5) instead of -1,
# it suggests there is an error in how the bounds (left/right) are updated.
