#exercise 1:
class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call = f"{self.phone_number} called {other_phone.phone_number}"
        self.call_history.append(call)
        print(call)

    def show_call_history(self):
        print(self.call_history)

    def send_message(self, other_phone, content):
        message = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content
        }
        self.messages.append(message)
        other_phone.messages.append(message)

    def show_outgoing_messages(self):
        for message in self.messages:
            if message["from"] == self.phone_number:
                print(message)

    def show_incoming_messages(self):
        for message in self.messages:
            if message["to"] == self.phone_number:
                print(message)

    def show_messages_from(self, phone_number):
        for message in self.messages:
            if message["from"] == phone_number:
                print(message)

phone1 = Phone("0612345678")
phone2 = Phone("0698765432")

phone1.call(phone2)
phone1.send_message(phone2, "Hey, how are you?")
phone2.send_message(phone1, "I'm good, thanks!")

print("\nPhone 1 call history:")
phone1.show_call_history()

print("\nPhone 1 outgoing messages:")
phone1.show_outgoing_messages()

print("\nPhone 1 incoming messages:")
phone1.show_incoming_messages()

print("\nMessages from Phone 2:")
phone1.show_messages_from("0698765432")