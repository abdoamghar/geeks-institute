# import the whole module.
import operators

print(operators.addOperator(3,4))
print(operators.divideOperator(8,4))

# Import specific functions
from operators import addOperator, divideOperator

print(addOperator(3,4))
print(divideOperator(8,4))

# Import using aliases
import operators as op

print(op.addOperator(3,4))
print(op.divideOperator(8,4))