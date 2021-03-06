# Codeville

## Minimum Viable Product

- Able to login with Github account
- Able to immediately see list of projects
  - able to sort by most recent commit, most recent, deadline
    - deadline within certain timeframe with indicator
  - search bar
  - see project life and progress
    - Commit history
    - % tasks completed
- drag and drop / sockets
- visual representation of progress
  - progress bar
  - some graph / chart
- rewards
  - 9 fruits / vegetables / trees
  - seed grows or dies
  - should change as project scope changes
    - make transition fun
  - once finished, should be a visual celebration / confirmation
  - gets added to inventory
  - new crops are added immediately to farm plot, extras are kept in inventory

## Tech Stack

- React
- Database PostgreSQL
- Python

## Stretch

- blockage support
- Sub-projects (global vs current sp)
- can sell extra crops to a market for coins, and use coins for some real life action (eg. planting a real tree)

## Components

- App
- Login
- Navigation
- ProjectList
  - ProjectListItem
- TrelloBoard
  - TrelloBoardColumn
    - ColumnTitle
    - ColumnList
      - ColumnListItem
- Farm
  - FarmList
    - FarmListItem
  - FarmBoard
  - Crop
- Footer
- Add
- Delete
- Edit
- Loading
- Error

Crops

- Strawberries
- Blueberries
- Sunflowers
- Melon
- Pumpkin
- Starfruit
- Corn
- Eggplant

