# Example: A function to calculate the total price after applying a discount
def calculate_total(price, discount_rate):
    """
    Calculate the total price after applying a discount.
    """
    print("Starting total price calculation...")  # Log the process
    discounted_price = price * (1 - discount_rate)
    tax = discounted_price * 0.1  # 10% tax
    total_price = discounted_price + tax
    print(f"Price: {price}, Discount Rate: {discount_rate}, Total: {total_price}")
    return total_price


# Step 1: Introduce a subtle typo
# Bug: The variable `discount_rate` is accidentally typed as `dicount_rate`
def calculate_total_with_typo(price, discount_rate):
    """
    Buggy version with a subtle typo.
    """
    print("Starting total price calculation (buggy version)...")  # Log the process
    discounted_price = price * (1 - dicount_rate)  # Typo: `dicount_rate` instead of `discount_rate`
    tax = discounted_price * 0.1  # 10% tax
    total_price = discounted_price + tax
    print(f"Price: {price}, Discount Rate: {discount_rate}, Total: {total_price}")
    return total_price


# Step 2: Reproduce the Issue
try:
    result = calculate_total_with_typo(100, 0.2)
    print(f"Total price: {result}")
except NameError as e:
    print(f"Error detected: {e}")


# Step 3: Trace through the Code
# Carefully read through the function to trace variable names and logic.
# 1. Identify all variable assignments and ensure the variable names match.
# 2. Compare the buggy implementation with the correct logic in `calculate_total`.

# Observed issue:
# `dicount_rate` was used instead of `discount_rate`, causing a `NameError`.

# Step 4: Fix the Typo
def calculate_total_fixed(price, discount_rate):
    """
    Fixed version of the function.
    """
    print("Starting total price calculation (fixed version)...")  # Log the process
    discounted_price = price * (1 - discount_rate)  # Corrected variable name
    tax = discounted_price * 0.1  # 10% tax
    total_price = discounted_price + tax
    print(f"Price: {price}, Discount Rate: {discount_rate}, Total: {total_price}")
    return total_price


# Step 5: Verify the Fix
try:
    result = calculate_total_fixed(100, 0.2)
    print(f"Total price (fixed): {result}")  # Expected: 88.0
except Exception as e:
    print(f"Error detected after fix: {e}")

