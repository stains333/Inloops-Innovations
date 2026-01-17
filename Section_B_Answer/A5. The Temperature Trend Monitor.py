def temperatureMonitor(temperatureArray, threshold):
    i = 0
    while i <= len(temperatureArray):               
        if temperatureArray[i] > threshold:         
            print(f"Exceeding Temperature = {temperatureArray[i]}, index = {i}")        
            break                                   
        else:
            i += 1                                  

temperatureArray = [72, 75, 78, 82, 91, 95, 88] 
threshold = 90
temperatureMonitor(temperatureArray, threshold)     

