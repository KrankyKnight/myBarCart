select count(*)
from(
SELECT a.recipeID, count(a.recipeID), b.totalIngredients
FROM idRecipes a
INNER JOIN recipeTotalIngredients b
on a.recipeID = b.recipeID
GROUP BY a.recipeID
HAVING count(a.recipeID) = b.totalIngredients
) as test;