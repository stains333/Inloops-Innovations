def loyaltyPointsCalculator(membershipTier, totalSpent):
    if totalSpent < 100:
        return 0
    else:
        if membershipTier == "Gold":
            points = (totalSpent//100) * 10
            if totalSpent > 500:
                points += 50
        elif membershipTier == "Silver":
            points = (totalSpent//100) * 5
            if totalSpent > 500:
                points += 20
        elif membershipTier == "Regular":
            points = (totalSpent//100) * 2
    return points        
               
membershipTier = "Gold"
totalSpent = 650
loyaltyPointsCalculator(membershipTier,totalSpent)