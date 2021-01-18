class ChannelSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :messages
    attribute :users do |channel|
      UserSerializer.new(channel.users.uniq)
    end
  end