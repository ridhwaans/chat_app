class MessagesController < ApplicationController
    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.new(message_params)
        channel = Channel.find(message_params["channel_id"])
        if message.save
            puts "successfully saved a message!"
            ChatChannel.broadcast_to(channel, {
                channel: ChannelSerializer.new(channel),
                users: UserSerializer.new(channel.users),
                messages: MessageSerializer.new(channel.messages)
            })
        end
        render json: MessageSerializer.new(message)
    end

    private

    def message_params
        params.require(:message).permit(:content, :user_id, :channel_id)
    end
end