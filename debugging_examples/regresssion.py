# Example: Debugging a regression in a function
# The function worked in the past but now throws an unexpected error.

# Step 1: Function that used to work
def calculate_discount(price, discount_rate):
    """
    Calculate the discounted price.
    Returns the discounted price or raises an error for invalid inputs.
    """
    if price < 0 or discount_rate < 0 or discount_rate > 1:
        raise ValueError("Invalid price or discount rate.")
    return price * (1 - discount_rate)

# Step 2: Verify the issue
# Run the function to reproduce the bug
try:
    result = calculate_discount(100, 0.2)  # Expected: 80.0
    print(f"Discounted price: {result}")
except ValueError as e:
    print(f"Error: {e}")  # Currently, this raises a ValueError unexpectedly

# Step 3: Use git bisect to find the problematic commit
# Start the bisecting process in the terminal
# % git bisect start
# % git bisect bad  # Mark the current commit as "bad"
# % git bisect good <commit_hash>  # Mark the last known "good" commit

# Step 4: Test each commit during bisecting
# Git will check out a midpoint commit. Run this function in that commit.
try:
    result = calculate_discount(100, 0.2)  # Test if the function works in this commit
    print(f"Discounted price: {result}")
    print("This commit is GOOD")
    # Mark this commit as good in the terminal
    # % git bisect good
except ValueError:
    print("This commit is BAD")
    # Mark this commit as bad in the terminal
    # % git bisect bad

# Step 5: Git bisect narrows down to the first bad commit
# When the bisect process completes, Git will output the first bad commit.
# Example terminal output:
# d3c0ffee is the first bad commit

# Step 6: Review the problematic commit
# View the changes introduced in the bad commit
# % git show d3c0ffee

# Example: The bad commit added this problematic line
# if price < 0 or discount_rate < 0 or discount_rate > 1 or price > 1000:
#     raise ValueError("Invalid price or discount rate.")

# Step 7: Fix the bug and test again
# Modify the code to ensure the error condition is valid
def calculate_discount(price, discount_rate):
    """
    Calculate the discounted price.
    Returns the discounted price or raises an error for invalid inputs.
    """
    if price < 0 or discount_rate < 0 or discount_rate > 1:  # Removed unnecessary condition
        raise ValueError("Invalid price or discount rate.")
    return price * (1 - discount_rate)

# Test after fixing
try:
    result = calculate_discount(100, 0.2)
    print(f"Discounted price: {result}")  # Expected: 80.0
except ValueError as e:
    print(f"Error: {e}")

# Step 8: End the bisect session
# % git bisect reset  # Reset Git to the original branch
