import json
import random
import string

def generate_username(name):
    # extract first and last name initials
    first_name, last_name = name.split()
    username = first_name.lower() + last_name.lower()
    
    return username

def generate_password(length=12):
    letters = string.ascii_letters
    numbers = string.digits
    special_chars = string.punctuation

    # choose one number
    password = random.choice(numbers)

    # choose one special character
    special_char = random.choice(special_chars)
    while special_char.isalnum():  # ensure special character is not alphanumeric
        special_char = random.choice(special_chars)
    password += special_char

    # fill the rest of the password with random letters
    available_chars = letters
    password += ''.join(random.choices(available_chars, k=length - 2))

    # shuffle the password to make the order random
    password_list = list(password)
    random.shuffle(password_list)
    password = ''.join(password_list)

    return password

def generate_email(name):
    # extract first and last name
    first_name, last_name = name.split()
    # generate email from first and last name
    email = f"{first_name.lower()}.{last_name.lower()}@hospital.com"
    return email

def generate_phone_number():
    # generate a random phone number with 10 digits
    return f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}"

if __name__ == "__main__":
    with open("patient_data.json") as f:
        staff_data = json.load(f)

    staff_credentials = []

    imageFilePath = "./components/images/profileImage.png"

    # Generate admin data
    admin_data = {
        "staffID": "Administrator",
        "name": "Administrator",
        "specialty": "Administrator",
        "photo": imageFilePath,
        "username": "admin",
        "password": "admin",
        "email": "Administrator@hospital.com",
        "phone_number": "000-000-0000"
    }
    staff_credentials.append(admin_data)

    for staff in staff_data["staff"]:
        staffID = staff["staffID"]
        name = staff["name"]
        specialty = staff["specialty"]
        username = generate_username(name)
        password = generate_password()
        email = generate_email(name)
        phone_number = generate_phone_number()
        staff_credentials.append({
            "staffID": staffID,
            "name": name,
            "specialty": specialty,
            "photo": imageFilePath,
            "username": username,
            "password": password,
            "email": email,
            "phone_number": phone_number
        })

    with open("login_credentials.json", "w") as outfile:
        json.dump(staff_credentials, outfile, indent=4)

    print("Staff credentials saved to login_credentials.json.")