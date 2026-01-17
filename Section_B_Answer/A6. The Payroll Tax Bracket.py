def salaryCalculator(grossSalary, isContractor):
    if grossSalary <= 3000:                     
        tax = 0.10
    elif 3001 <= grossSalary <= 7000:
        tax = 0.15
    elif grossSalary > 7000:
        tax = 0.2
    netSalary = grossSalary - tax*grossSalary
    if isContractor == True:
        netSalary = netSalary - 100
    return netSalary        

grossSalary = 5000
isContractor = True
salaryCalculator(grossSalary, isContractor)