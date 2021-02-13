# Calories Tracker

Calories tracker is web app created to calculate calories you are eating through the day. App calculate calories based on products information that user provide. Each user can keep his own list of product that he use on everyday basis.

## How to start project locally?

### Requirements

To run this app locally you need node.js with npm.

### Run project

1. Run back-end from [this repository](https://github.com/musialpatryk/calories-tracker-api).
1. Clone project.
1. Install project dependencies using:

```
npm install
```

4. Start application using:

```
npm run start-api
```

## How to use application?

### Loggin in

Currently app is in "work in progress" mode so there is no registration page. To test app you can use predefined test user:
**Login** | **Password**
---- | ----
user | p@ssword

### How to calculate calories?

1. Login.
1. Navigate to "Products" tab in main menu.
1. Insert products you are using during the day.
1. Navigate to "Calculate calories" tab in main menu.
1. Compose your first meal from products added before and add additional meals if you want.

### How to add product?

1. Login in.
1. Navigate to "Products" tab in main menu.
1. Fill in name of product and calories in 100 grams of product (you can find that on product label or Google it).
1. Click "Add product" button.

### How to delete product?

1. Login in.
1. Navigate to "Products" tab in main menu.
1. Click "-" button on product you want to remove.

## Planed features

- Save day meals and calculations in form of dates in calendar,
- "Calendar" tab with month view displaying calories on each day provided,
- registration panel,
- PWA support.
