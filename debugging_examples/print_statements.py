# Example: A function that calculates cumulative sums of a list
def cumulative_sum(arr):
    """
    Calculate the cumulative sum of an array.
    """
    cumulative = []
    for i in range(len(arr) + 1):  # Intentional bug: range goes out of bounds
        print(f"Index: {i}")  # Print to monitor index
        if i < len(arr):  # Avoid out-of-bounds access
            cumulative.append(arr[i] + (cumulative[-1] if cumulative else 0))
            print(f"cumulative[{i}] = {cumulative[-1]}")  # Monitor calculations
        else:
            print("Out of bounds access attempted!")  # Highlight the issue
    return cumulative

# Step 1: Reproduce the Issue
try:
    result = cumulative_sum([1, 2, 3, 4])
    print("Cumulative sum:", result)  # Expected: [1, 3, 6, 10]
except IndexError as e:
    print(f"Error encountered: {e}")

# Step 2: Add More Print Statements to Debug
def debug_cumulative_sum(arr):
    """
    Debugging version of the cumulative sum function with print statements.
    """
    print("Starting cumulative sum calculation...")
    cumulative = []
    for i in range(len(arr) + 1):  # Bug: range goes out of bounds
        print(f"Processing index {i}...")
        if i < len(arr):
            print(f"Adding arr[{i}] = {arr[i]} to cumulative sum")
            cumulative.append(arr[i] + (cumulative[-1] if cumulative else 0))
            print(f"Updated cumulative: {cumulative}")
        else:
            print(f"Index {i} is out of bounds! Terminating loop.")
    return cumulative

# Step 3: Drill Down with Print Statements
try:
    result = debug_cumulative_sum([1, 2, 3, 4])
    print("Cumulative sum (debugged):", result)
except IndexError as e:
    print(f"Error encountered during debugging: {e}")

# Step 4: Fix the Bug
def fixed_cumulative_sum(arr):
    """
    Fixed version of the cumulative sum function.
    """
    print("Starting fixed cumulative sum calculation...")
    cumulative = []
    for i in range(len(arr)):  # Fixed: loop only up to len(arr)
        print(f"Processing index {i}...")
        cumulative.append(arr[i] + (cumulative[-1] if cumulative else 0))
        print(f"Updated cumulative: {cumulative}")
    return cumulative

# Step 5: Verify the Fix
result = fixed_cumulative_sum([1, 2, 3, 4])
print("Cumulative sum (fixed):", result)  # Expected: [1, 3, 6, 10]
