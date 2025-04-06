// import { column, Schema, Table } from '@powersync/web';

// export const LISTS_TABLE = 'lists';
// export const TODOS_TABLE = 'todos';

// const todos = new Table(
//   {
//     list_id: column.text,
//     created_at: column.text,
//     completed_at: column.text,
//     description: column.text,
//     created_by: column.text,
//     completed_by: column.text,
//     completed: column.integer
//   },
//   { indexes: { list: ['list_id'] } }
// );

// const lists = new Table({
//   created_at: column.text,
//   name: column.text,
//   owner_id: column.text
// });

// export const AppSchema = new Schema({
//   todos,
//   lists
// });

// export type Database = (typeof AppSchema)['types'];
// export type TodoRecord = Database['todos'];
// // OR:
// // export type Todo = RowType<typeof todos>;

// export type ListRecord = Database['lists'];

import { column, Schema, Table } from "@powersync/web";
// OR: import { column, Schema, Table } from '@powersync/react-native';

const users = new Table(
  {
    // id column (text) is automatically included
    email: column.text,
    business_id: column.text,
    business_branch_id: column.text,
    auth_user_id: column.text,
    role: column.text,
    created_at: column.text,
    name: column.text,
  },
  { indexes: {} }
);

const receipts = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    user_id: column.text,
    business_branch_id: column.text,
    payment_method_id: column.text,
    receipt_number: column.text,
    total_product_price: column.integer,
    total_bill: column.integer,
    cash_given: column.integer,
    cash_change: column.integer,
    total_profit: column.integer,
    created_at: column.text,
    is_archived: column.integer,
    old_receipt_of: column.text,
    total_discount_price: column.integer,
    total_additional_fee_price: column.integer,
    total_item: column.integer,
  },
  { indexes: {} }
);

const receipt_products = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    receipt_id: column.text,
    product_id: column.text,
    product_cost_price: column.integer,
    product_sale_price: column.integer,
    quantity: column.integer,
    created_at: column.text,
    product_name: column.text,
  },
  { indexes: {} }
);

const receipt_additional_fees = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    receipt_id: column.text,
    name: column.text,
    amount: column.integer,
    created_at: column.text,
  },
  { indexes: {} }
);

const receipt_discounts = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    receipt_id: column.text,
    name: column.text,
    amount: column.integer,
    created_at: column.text,
  },
  { indexes: {} }
);

const categories = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    name: column.text,
    created_at: column.text,
  },
  { indexes: {} }
);

const payment_methods = new Table(
  {
    // id column (text) is automatically included
    name: column.text,
    business_id: column.text,
  },
  { indexes: {} }
);

const business_receipt_prefs = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    footer_message: column.text,
    receipt_show_logo: column.integer,
    receipt_show_address: column.integer,
    receipt_show_user_name: column.integer,
    receipt_show_footer_message: column.integer,
  },
  { indexes: {} }
);

const business = new Table(
  {
    // id column (text) is automatically included
    name: column.text,
    address: column.text,
    logo_url: column.text,
    created_at: column.text,
  },
  { indexes: {} }
);

const products = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    category_id: column.text,
    barcode_number: column.text,
    name: column.text,
    sale_price: column.integer,
    cost_price: column.integer,
    stock: column.integer,
    unit: column.text,
    image_url: column.text,
    created_at: column.text,
  },
  { indexes: {} }
);

const expenses = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    name: column.text,
    amount: column.integer,
    description: column.text,
    created_at: column.text,
  },
  { indexes: {} }
);

const product_stock_histories = new Table(
  {
    // id column (text) is automatically included
    user_id: column.text,
    product_id: column.text,
    created_at: column.text,
    adjustment_amount: column.integer,
    notes: column.text,
    before: column.integer,
    after: column.integer,
    business_id: column.text,
  },
  { indexes: {} }
);

const business_branches = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    name: column.text,
    address: column.text,
  },
  { indexes: {} }
);

const user_settings = new Table(
  {
    // id column (text) is automatically included
    business_id: column.text,
    pin: column.text,
  },
  { indexes: {} }
);

export const AppSchema = new Schema({
  users,
  receipts,
  receipt_products,
  receipt_additional_fees,
  receipt_discounts,
  categories,
  payment_methods,
  business_receipt_prefs,
  business,
  products,
  expenses,
  product_stock_histories,
  business_branches,
  user_settings,
});

export type Database = (typeof AppSchema)["types"];
