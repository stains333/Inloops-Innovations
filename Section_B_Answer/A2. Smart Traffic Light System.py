def smartTrafficLightSystem(currentSignal, isEmergencyVehicleApproaching):
    if isEmergencyVehicleApproaching == True:   # imp!, there is no switch statement in Python, so I used if-else
        return "IMMEDIATE_GREEN"        
    else:                                       
        if currentSignal == "RED":              
            return "STOP"
        elif currentSignal == "YELLOW":         
            return "PREPARE TO STOP"
        elif currentSignal == "GREEN":          
            return "GO"
        else:                                   
            return "INVALID SIGNAL"
        
smartTrafficLightSystem("RED", True)            
smartTrafficLightSystem("YELLOW", False)       

        
