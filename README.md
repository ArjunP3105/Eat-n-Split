# 🍽️ Eat n Split Project

A dynamic bill-splitting app built with **React** to streamline expense management among friends. This project showcases interactive features, stateful components, and conditional rendering for an intuitive user experience.

## ✨ Features
- **Add Friends**: Users can add friends to the list with their name and a unique avatar image.
- **View Balances**: Displays each friend's balance with statements like:
  - *You owe [Friend] $X* (negative balance)
  - *[Friend] owes you $X* (positive balance)
  - *You and [Friend] are even* (zero balance).
- **Select a Friend**: Users can select a friend to split a bill.
- **Split the Bill**: 
  - Input the total bill, specify how much you and your friend paid, and choose who is covering the bill.
  - Automatically updates each friend's balance based on the split.
- **Responsive Design**: Optimized for all devices, including desktops and mobile.
  
  ![1](https://github.com/user-attachments/assets/c129af8d-5cbd-4b97-bbcc-522d138dbe34)

## 🔧 Key Concepts Learned
- **State Management**: Used `useState` to manage:
  - Friends list.
  - Selected friend.
  - Dynamic bill calculations.
- **Props & Component Communication**: Efficient data flow between parent (`App`) and child components (`FriendList`, `SplitBill`).
- **Conditional Rendering**: Dynamically shows the bill-splitting form when a friend is selected.
- **List Rendering**: Maps through friends to render the list dynamically.
- **Event Handling**: Captures user inputs for adding friends, calculating splits, and resetting forms.

## 🚀 Technologies Used
- **React**: Core framework for building the app.
- **CSS**: Used for clean and responsive styling.

---

This project demonstrates how to build a practical React app with dynamic updates and a user-friendly interface for shared expense management.
