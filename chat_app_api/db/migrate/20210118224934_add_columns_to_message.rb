class AddColumnsToMessage < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :user_id, :integer
    add_column :messages, :room_id, :integer
    add_column :messages, :title, :string
    add_column :messages, :content, :string
  end
end
