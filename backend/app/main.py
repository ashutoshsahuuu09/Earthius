from app.services.chat_service import ask_earthius


print("Earthius Instialize")
print("Type 'exit' to quit.\n")

while True:

    user_input = input("you: ")

    if user_input.lower() == "exit":
        break

    response = ask_earthius(user_input)

    print("\nEarthius:")
    print(response)
    print()
