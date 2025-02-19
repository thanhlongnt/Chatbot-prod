import math

# Step 1: Define the AreaCalculator class
# The class is responsible for computing the area of various shapes.
class AreaCalculator:
    def circle_area(self, radius):
        return math.pi * radius * radius  # Formula: πr²

    def rectangle_area(self, width, height):
        return width * height  # Formula: width × height

    def triangle_area(self, base, height):
        return base / 2 + height  # ❌ Bug: Incorrect formula!

# Step 2: Test the functions with known values
calculator = AreaCalculator()

# Expected Outputs:
# - Circle with radius 5: π * 5² ≈ 78.54
# - Rectangle 4x6: 4 * 6 = 24
# - Triangle base=3, height=8: (1/2) * 3 * 8 = 12
print("Circle area (r=5):", calculator.circle_area(5))  # Expected: 78.54
print("Rectangle area (4x6):", calculator.rectangle_area(4, 6))  # Expected: 24
print("Triangle area (3,8):", calculator.triangle_area(3, 8))  # Expected: 12, but wrong!

# Output:
# Circle area (r=5): 78.53981633974483 ✅ Correct
# Rectangle area (4x6): 24 ✅ Correct
# Triangle area (3,8): 9.5 ❌ Incorrect! Expected: 12
# File a bug ticket or debug the library yourself

# Step 3: Narrowing Down the Responsible Code
# The issue is with `triangle_area()`, so let's isolate and test it separately.
def triangle_area_debug(base, height):
    return base / 2 + height  # Suspicious addition instead of multiplication

print("Debugging triangle_area(3,8):", triangle_area_debug(3, 8))  # Still wrong! (Expected: 12)

# Step 4: Identify the mistake
# The formula should be (1/2) * base * height, but we used `base / 2 * height`
# This means 3 / 2 + 8 = 1.5 * 8 = 9.5 instead of 12

# Step 5: Fix the function by replacing faulty code with known good code
class AreaCalculatorFixed:
    def circle_area(self, radius):
        return math.pi * radius * radius

    def rectangle_area(self, width, height):
        return width * height

    def triangle_area(self, base, height):
        return 0.5 * base * height  # ✅ Fixed formula!

# Step 6: Verify the fix
calculator_fixed = AreaCalculatorFixed()
print("Fixed Triangle area (3,8):", calculator_fixed.triangle_area(3, 8))  # Expected: 12 ✅

# Step 7: Additional verification
# If we suspected a bug in Python's math module, we could test it separately.
print("Verifying math.pi:", math.pi)  # Expected: 3.141592653589793 (Correct)

# Step 8: Edge Case Handling
# If an empty or invalid input were an issue, we could handle it explicitly:
class AreaCalculatorSafe:
    def circle_area(self, radius):
        return math.pi * radius * radius if radius > 0 else 0

    def rectangle_area(self, width, height):
        return width * height if width > 0 and height > 0 else 0

    def triangle_area(self, base, height):
        return 0.5 * base * height if base > 0 and height > 0 else 0  # Prevents negative inputs

calculator_safe = AreaCalculatorSafe()
print("Safe Triangle area (-3,8):", calculator_safe.triangle_area(-3, 8))  # Should return 0 instead of an error
