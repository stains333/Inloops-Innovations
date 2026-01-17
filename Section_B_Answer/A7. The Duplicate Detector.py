def duplicateDetector(usernames):
    for i in range(0,len(usernames)):
        for j in range(i+1,len(usernames)):
            if usernames[i] == usernames[j]:
                print(f"Duplicate found: {usernames[i]}")

usernames = ["admin", "user1", "guest", "admin", "staff", "user1"]
duplicateDetector(usernames)
