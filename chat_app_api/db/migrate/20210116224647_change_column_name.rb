class ChangeColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :encrypted_password, :password_digest
  end
end
