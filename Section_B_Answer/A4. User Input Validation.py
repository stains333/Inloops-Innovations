def validPINfunction():
    PIN = "0"                                     
    while len(PIN) != 4:                          # imp!, there is no do while loop in python
        PIN = input("Please enter a 4-digit PIN") 
    PIN = int(PIN)                                
    print("PIN Setup Successful")                 
    return 0

validPINfunction()                                