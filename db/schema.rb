# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180410171639) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attachinary_files", force: :cascade do |t|
    t.string   "attachinariable_type"
    t.integer  "attachinariable_id"
    t.string   "scope"
    t.string   "public_id"
    t.string   "version"
    t.integer  "width"
    t.integer  "height"
    t.string   "format"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["attachinariable_type", "attachinariable_id", "scope"], name: "by_scoped_parent", using: :btree
  end

  create_table "emails", force: :cascade do |t|
    t.string   "email_address"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "measures", force: :cascade do |t|
    t.string   "text_1"
    t.integer  "ingredient_id"
    t.integer  "recipe_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "text_2"
    t.integer  "quantity"
    t.integer  "order",         default: 0
    t.index ["ingredient_id"], name: "index_measures_on_ingredient_id", using: :btree
    t.index ["recipe_id"], name: "index_measures_on_recipe_id", using: :btree
  end

  create_table "recipes", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "user_id"
    t.integer  "cooking_time"
    t.integer  "preparation_time"
    t.string   "difficulty"
    t.integer  "servings"
    t.string   "photo"
    t.text     "description"
    t.index ["user_id"], name: "index_recipes_on_user_id", using: :btree
  end

  create_table "recipes_tags", id: false, force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "tag_id"
    t.index ["recipe_id"], name: "index_recipes_tags_on_recipe_id", using: :btree
    t.index ["tag_id"], name: "index_recipes_tags_on_tag_id", using: :btree
  end

  create_table "recipes_tools", id: false, force: :cascade do |t|
    t.integer "recipe_id"
    t.integer "tool_id"
    t.index ["recipe_id"], name: "index_recipes_tools_on_recipe_id", using: :btree
    t.index ["tool_id"], name: "index_recipes_tools_on_tool_id", using: :btree
  end

  create_table "steps", force: :cascade do |t|
    t.text     "text"
    t.integer  "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "order"
    t.index ["recipe_id"], name: "index_steps_on_recipe_id", using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tools", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "admin",                  default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "measures", "ingredients"
  add_foreign_key "measures", "recipes"
  add_foreign_key "steps", "recipes"
end
