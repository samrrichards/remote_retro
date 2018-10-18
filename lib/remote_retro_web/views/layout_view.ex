defmodule RemoteRetroWeb.LayoutView do
  use RemoteRetroWeb, :view

  def app_js(conn) do
    case Application.get_env(:remote_retro, :env) do
      :dev -> static_path(conn, "/js/app.js")
      _ -> static_path(conn, "/js/app.js")
    end
  end

  def app_css(conn) do
    case Application.get_env(:remote_retro, :env) do
      :dev -> static_path(conn, "/css/app.css")
      _ -> static_path(conn, "/css/app.css")
    end
  end
end
