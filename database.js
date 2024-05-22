import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists menuitems (id integer primary key not null, name text, price text, category text, description text, image text);"
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("select * from menuitems", [], (_, { rows }) => {
         const menuItems = rows._array;
         resolve(menuItems);
         console.log("Save in db: " + JSON.stringify(menuItems));
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    menuItems.forEach(({ name, price, category, description, image }) => {
      tx.executeSql(
        `INSERT INTO menuitems (name, price, category, description, image) VALUES (?, ?, ?, ?)`,
        [name, price, category, description, image],
        (_, { rowsAffected }) => {
          console.log(`${rowsAffected} row inserted.`);
        },
        (_, error) => {
          console.error("Error inserting menu item:", error);
        }
      );
    });
  });
}
