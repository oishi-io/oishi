module RecipeConcern
  extend ActiveSupport::Concern

  class_methods do
    def complicated_user_method(args)
     # // lots of complicated user stuff
    end
    def another_complicated_method(args)
     # // more stuff
    end
  end
end
