# Example: A function to process some data, but unsure why part of the logic is there
def process_data(data):
    """
    Process some data by applying a transformation.
    """
    print("Processing data...")
    # The transformation logic is unclear
    result = data * 10  # This multiplication seems strange, but the function works
    if result < 50:
        print("Small result, applying fallback logic...")
        result = result + 5  # Why is this added? Unclear if this is needed or not.
    else:
        print("Result is large enough, continuing.")
    print(f"Processed result: {result}")
    return result


# Step 1: Try debugging the code for an hour with no progress
data_input = 4
print("Starting to debug...")
try:
    result = process_data(data_input)
except Exception as e:
    print(f"Error encountered: {e}")

# Step 2: Investigate using `git blame` to find who wrote the unclear code
# In the terminal (outside of the script), use `git blame` to check the author of a specific line:
# % git blame process_data.py

# Step 3: Reach out to the original author (based on `git blame`) or a teammate for clarification
# Assuming the output of `git blame` suggests that "Alice" wrote the part with unclear logic.
print("\n--- Reaching out to Alice ---")
# Ask Alice: "Hey, I was reviewing the logic where we multiply by 10 and add 5 if the result is small. Could you clarify why this step is necessary?"

# Step 4: Expert Suggestion from Alice (hypothetical response):
# Alice clarifies that the multiplication by 10 was introduced to adjust values for downstream processing, and adding 5 ensures all values are above a threshold for further calculations.
# After hearing Alice's explanation, we realize that the logic is indeed correct, but the comment was unclear.

# Step 5: Apply Fix or Update Comments
def updated_process_data(data):
    """
    Process some data by applying a transformation with clarified logic.
    """
    print("Processing data...")
    result = data * 10  # Multiply to scale for downstream processing
    if result < 50:
        print("Small result, adding 5 to bring above threshold.")
        result = result + 5  # Add 5 to ensure all values are above a minimum threshold
    else:
        print("Result is large enough, continuing.")
    print(f"Processed result: {result}")
    return result

# Verify the updated code works as expected
data_input = 4
result = updated_process_data(data_input)
print(f"Updated result: {result}")
