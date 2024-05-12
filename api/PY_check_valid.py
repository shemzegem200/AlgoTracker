# sample_script.py
class Solution:
    def isValidSudoku(self, board) -> bool:
        # Checking rows
        for i in range(9):
            seen = set()
            for j in range(9):
                if board[i][j] != '':
                    if board[i][j] in seen:
                        return False
                    seen.add(board[i][j])
        
        # Checking columns
        for j in range(9):
            seen = set()
            for i in range(9):
                if board[i][j] != '':
                    if board[i][j] in seen:
                        return False
                    seen.add(board[i][j])
        
        # Checking all 3x3 boxes
        for m in range(3):
            for n in range(3):
                seen = set()
                for i in range(3*m, 3*m+3):
                    for j in range(3*n, 3*n+3):
                        if board[i][j] != '':
                            if board[i][j] in seen:
                                return False
                            seen.add(board[i][j])
        
        return True

import sys
import json

json_string = sys.argv[1]
param1 = json.loads(json_string) #deserialize the string to a json object
#now, convert the json object into a python list
board = []
for row in param1:
    board.append(list(row))
#print(board)#testing
#finally call the function
result = Solution().isValidSudoku(board)
print(result)