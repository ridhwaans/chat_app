class ChangeRoomIdColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :messages, :room_id, :channel_id
  end
end
