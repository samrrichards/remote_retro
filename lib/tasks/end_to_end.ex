defmodule Mix.Tasks.EndToEnd do
  use Mix.Task

  @shortdoc "Runs end-to-end tests"
  def run(_) do
    compile_js()
    IO.puts "\n#{IO.ANSI.green()}Executing end-to-end tests...#{IO.ANSI.reset()}\n"
    IO.puts "\tNote: browser logs will written to `browser_logs.log`\n"
    System.cmd(
      "mix",
      ["test", "test/features/", "--only", "feature_test", "--color"],
      into: IO.stream(:stdio, :line)
    )
  end

  defp compile_js do
    System.cmd("npm", ["run", "compile-dev"], [into: IO.stream(:stdio, :line)])
  end
end
