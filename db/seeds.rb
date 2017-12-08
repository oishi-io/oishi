# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "starts destroying"

Measure.destroy_all
Tag.destroy_all
Tool.destroy_all
Ingredient.destroy_all
Recipe.destroy_all

puts "starts creating"



onigiri = Recipe.new(title: "onigiri", servings: 2, instructions: "faire une belle petite boulette en triangle")
onigiri.save

rice = Ingredient.new(name: "rice")
rice.save


umeboshi = Ingredient.new(name: "umeboshi")
umeboshi.save

vegan = Tag.new(name: "vegan")
vegan.save

oishi = Tag.new(name: "oishi")
oishi.save

measure1 = Measure.new(quantity: 1, text_1: " boulette de ", text_2: " gluant")
measure1.ingredient = rice
measure1.recipe = onigiri
measure1.save

measure2 = Measure.new(quantity: 1, text_1: " boulette de ", text_2: " gluant")
measure2.ingredient = umeboshi
measure2.recipe = onigiri
measure2.save

couteau = Tool.new(name: "couteau")
couteau.save

hashi = Tool.new(name: "hashi")
hashi.save

onigiri.tools << couteau
onigiri.tools << hashi

onigiri.tags << vegan
onigiri.tags << oishi
onigiri.save

oli = User.create(email: "a@a.a", password: "azerty", admin: true)
