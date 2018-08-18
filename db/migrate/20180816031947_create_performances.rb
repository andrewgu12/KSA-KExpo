class CreatePerformances < ActiveRecord::Migration[5.2]
  def change
    create_table :performances do |t|
      t.string :name
      t.decimal :votes

      t.timestamps
    end
  end
end
