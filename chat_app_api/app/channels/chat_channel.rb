class ChatChannel < ApplicationCable::Channel

    def subscribed
      @channel = Channel.find_by(id: params[:channel])
      stream_for @channel
    end
  
    def unsubscribed
    end
  end