# Example: A function that sorts a list but ends up in a bad state
def custom_sort(arr):
    """
    Custom sorting function (example buggy implementation).
    Sorts an array of integers in ascending order.
    """
    # Example buggy implementation (modifies array incorrectly)
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] > arr[j]:
                # Swap elements
                arr[i], arr[j] = arr[j], arr[i]
                # Bug: accidentally duplicates an element (simulating a bad state)
                if arr[i] % 2 == 0:  # Faulty condition for demonstration
                    arr[j] = arr[i]
    return arr


# Step 1: Reproduce the Issue
arr = [5, 3, 8, 6, 2]
print("Original array:", arr)
sorted_arr = custom_sort(arr)
print("Sorted array:", sorted_arr)  # Expected: [2, 3, 5, 6, 8], but observe incorrect result

# Step 2: Sprinkle Assertions to Check for Bad State
def debug_custom_sort(arr):
    """
    Debugging version of the custom sort function with assertions.
    """
    print("Starting sorting process...")
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]
                # Add assertions to check the state
                assert arr == sorted(arr[:j + 1]) + arr[j + 1:], \
                    f"Bad state after swap: {arr}"  # Ensure partial sorting is correct
                # Buggy line: duplicates element if arr[i] is even
                if arr[i] % 2 == 0:
                    arr[j] = arr[i]
                    # Assertion to detect the bad state immediately
                    assert len(arr) == len(set(arr)), f"Duplicate found: {arr}"
    return arr


# Step 3: Debug the Function
try:
    debug_custom_sort([5, 3, 8, 6, 2])
except AssertionError as e:
    print(f"AssertionError detected: {e}")

# Step 4: Drill Down to the Problematic Code
# The assertion pinpoints the problematic step in the loop where the bad state occurs.
# Once identified, inspect the logic and fix the bug.
def fixed_custom_sort(arr):
    """
    Fixed version of the sorting function.
    """
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]
                # Remove faulty duplication logic
    return arr


# Step 5: Verify the Fix
arr = [5, 3, 8, 6, 2]
sorted_arr = fixed_custom_sort(arr)
print("Sorted array after fix:", sorted_arr)  # Expected: [2, 3, 5, 6, 8]
