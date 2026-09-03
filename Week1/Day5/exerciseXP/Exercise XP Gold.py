class BankAccount:
    def __init__(self, balance, username, password):
        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False

    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated")

        if amount <= 0:
            raise Exception("Amount must be positive")

        self.balance += amount

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated")

        if amount <= 0:
            raise Exception("Amount must be positive")

        self.balance -= amount


class MinimumBalanceAccount(BankAccount):
    def __init__(self, balance, username, password, minimum_balance=0):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("You must be authenticated")

        if amount <= 0:
            raise Exception("Amount must be positive")

        if self.balance - amount <= self.minimum_balance:
            raise Exception("Minimum balance would be exceeded")

        self.balance -= amount


class ATM:
    def __init__(self, account_list, try_limit):
        if not isinstance(account_list, list):
            raise Exception("account_list must be a list")

        for account in account_list:
            if not isinstance(account, BankAccount):
                raise Exception("Invalid account")

        try:
            if try_limit <= 0:
                raise Exception
            self.try_limit = try_limit
        except Exception:
            self.try_limit = 2

        self.account_list = account_list
        self.current_tries = 0

        self.show_main_menu()

    def show_main_menu(self):
        while self.current_tries < self.try_limit:
            print("\n1. Log in")
            print("2. Exit")

            choice = input("Choose an option: ")

            if choice == "1":
                username = input("Username: ")
                password = input("Password: ")
                self.log_in(username, password)

            elif choice == "2":
                print("Goodbye!")
                break

            else:
                print("Invalid choice")

    def log_in(self, username, password):
        for account in self.account_list:
            account.authenticate(username, password)

            if account.authenticated:
                print("Login successful!")
                self.show_account_menu(account)
                return

        self.current_tries += 1
        print("Invalid username or password")

        if self.current_tries >= self.try_limit:
            print("You reached the maximum number of tries.")
            return

    def show_account_menu(self, account):
        while True:
            print("\n1. Deposit")
            print("2. Withdraw")
            print("3. Exit")

            choice = input("Choose an option: ")

            if choice == "1":
                try:
                    amount = int(input("Amount to deposit: "))
                    account.deposit(amount)
                    print("Deposit successful!")
                    print("Balance:", account.balance)
                except Exception as e:
                    print(e)

            elif choice == "2":
                try:
                    amount = int(input("Amount to withdraw: "))
                    account.withdraw(amount)
                    print("Withdrawal successful!")
                    print("Balance:", account.balance)
                except Exception as e:
                    print(e)

            elif choice == "3":
                print("Logged out.")
                account.authenticated = False
                break

            else:
                print("Invalid choice")


account1 = BankAccount(1000, "abdelhamid", "1234")
account2 = MinimumBalanceAccount(2000, "karim", "5678", 500)

atm = ATM([account1, account2], 3)