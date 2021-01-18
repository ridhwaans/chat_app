require 'rails_helper'
include BCrypt

RSpec.describe User, type: :model do
    it "should hash a user's password" do 
        @user = User.new
        # store it safely
        @user.update_attribute(:password,"my grand secret")
        # read it back
        @user.reload
        # compare it after retrieval
        expect(@user.password).to be_nil
        expect(@user.password_digest).to_not eql("my grand secret")
    end

    it "should not allow passwords that are less than 6 characters" do
        @user = User.new
        @user.update(:username => "avenger1", :password => "test")
        @user.validate
        expect(@user.errors.first.attribute).to eql :password
        expect(@user.errors.first.type).to eql :too_short
    end

    it "should not allow blank user names" do
        @user = User.new
        @user.update_attribute(:password,"check")
        @user.validate
        expect(@user.errors.first.attribute).to eql :username
        expect(@user.errors.first.type).to eql :blank
    end 

    it "should not allow user names that are less than 3 characters" do
        @user = User.new
        @user.update_attribute(:username,"av")
        @user.validate
        expect(@user.errors.first.attribute).to eql :username
        expect(@user.errors.first.type).to eql :too_short
    end 

    it "should not allow duplicate user names in the system" do
        @user = User.create(username: "avenger1", password: "testpass")
        expect(@user.valid?).to be_truthy
        @user.reload
        @user = User.new
        @user.update(username: "avenger1")
        @user.update(password: "testpass")
        @user.save
        expect(@user.valid?).to be_falsy
        expect(@user.errors.messages).to include {:username=>["has already been taken"]}
    end 

end