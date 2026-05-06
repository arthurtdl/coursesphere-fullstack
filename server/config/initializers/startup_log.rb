Rails.application.config.after_initialize do
  if Rails.env.development?
    # Busca a porta do .env ou usa 3000 como fallback
    port = ENV.fetch("SERVER_PORT") { "3000" }
    
    puts "\n📦 Server running on http://localhost:#{port}/"
    
    begin
      ActiveRecord::Base.connection.active?
      puts "📦 Database connected\n\n"
    rescue
      puts "❌ Database connection failed\n\n"
    end
  end
end