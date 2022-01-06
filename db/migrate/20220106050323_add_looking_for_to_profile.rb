class AddLookingForToProfile < ActiveRecord::Migration[7.1]
  def up
    execute <<-DDL
      CREATE TYPE profile_looking_for AS ENUM (
        'right_now', 'dates', 'chat'
      );
    DDL
    add_column :profiles, :looking_for, :profile_looking_for, array: true, default: '{}'
  end

  def down
    remove_column :profiles, :looking_for
    execute "DROP type profile_looking_for;"
  end
end
