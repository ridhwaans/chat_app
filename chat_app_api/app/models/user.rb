class User < ApplicationRecord
    #has_secure_password 
    #https://stackoverflow.com/questions/34526544/undefined-method-authenticate-in-ruby-on-rails
    # https://stackoverflow.com/questions/23723319/getting-password-cant-be-blank-with-has-secure-password/28573198

    attr_accessor :password
    validates :username, :presence => true, :length => { :in => 3..20 }
    validates_length_of :password, :in => 6..20, :on => :create
    validates_uniqueness_of :username
    validates_confirmation_of :password

    before_save :encrypt_password
    after_save :clear_password

    # check to see if a supplied user password matches the hashed version in the database
	def authenticate(password)
		if BCrypt::Password.new(self.password_digest) == password
			true
		else
			false
		end
	end


    def encrypt_password
        if password.present?
            self.password_digest = BCrypt::Password.create(password)
        end
    end

    def clear_password
        self.password = nil
    end

end
