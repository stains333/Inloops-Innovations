def itemsStock(stockLevels):
    for i in stockLevels:                 
        if i == 0:                        
            print("Out of Stock")         
        if 1 <= i <= 5:                   
            print("Restock Immediately")  

stockLevels = [15, 3, 0, 22, 8, 1]
itemsStock(stockLevels)                   