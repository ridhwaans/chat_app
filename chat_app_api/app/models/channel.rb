class Channel < ApplicationRecord

    attr_accessor :name
    validates :name, :presence => true, :uniqueness => true, :length => { :in => 3..20 }
end
