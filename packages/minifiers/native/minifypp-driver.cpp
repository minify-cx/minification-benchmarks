#include <minify/Minify.h>

#include <iostream>
#include <iterator>
#include <string>

int main(int argc, char** argv) {
    const std::string input(
        std::istreambuf_iterator<char>(std::cin),
        std::istreambuf_iterator<char>()
    );

    std::string output;
    std::string error;
    minify::Options options;
    if (argc > 2) {
        std::cerr << "usage: minifypp-benchmark [conservative|structured|aggressive]\n";
        return 2;
    }
    const std::string mode = argc == 2 ? argv[1] : "conservative";
    if (mode == "structured") {
        options.optimization = minify::OptimizationLevel::Structured;
    } else if (mode == "aggressive") {
        options.optimization = minify::OptimizationLevel::Aggressive;
    } else if (mode != "conservative") {
        std::cerr << "unknown Minify++ benchmark mode: " << mode << '\n';
        return 2;
    }
    if (!minify::javascript(input, output, error, options)) {
        std::cerr << error << '\n';
        return 1;
    }

    std::cout << output;
    return std::cout ? 0 : 1;
}
