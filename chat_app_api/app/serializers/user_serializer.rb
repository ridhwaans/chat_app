class UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :username
    attribute :channels do |user|
      user.channels.uniq
    end
  end