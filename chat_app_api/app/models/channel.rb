class Channel < ApplicationRecord

    has_many :messages
    has_many :users, through: :messages
    validates :name, :presence => true, :uniqueness => true, :length => { :in => 3..20 }
end
