Contract mimics that of the Prisoners's Dilemma

The contract can dynamically be set for the following scoring parameters:
- Winning Score: The score that terminates the game once a player has >= to that score
- Greed Score: The score awarded to the player that 'takes' if another player 'shares' (score 5 below)
- Mutual Score: The score awarded to both players if they both 'share' (score 1 below)

```
+----------+----------------------+
|          |       Player 2       |
+----------+----------------------+
|          |       | Share | Take |
+          +-------+-------+------+
| Player 1 | Share | 1/1   | 5/0  |
+          +-------+-------+------+
|          | Take  | 0/5   | 0/0  |
+----------+-------+-------+------+
```
Example Rules:
Winning Score = 20
Greed Score = 5
Mutual Score = 1
- If two placers 'share' they both receive 1 point and the game progresses
- If two players 'take', they receive no points and the game doesn't progress
- If either one of the players 'take's while the other player 'shares', the person who shared will receive no points while the person who takes will receive 5 points
- Game ends when one of the players obtain the winning score of 20 points
- Ties are possible in which no players win, the contract winner is the contract address itself.
