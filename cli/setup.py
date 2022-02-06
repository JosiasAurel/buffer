
import setuptools

with open("README.md", "r") as desc:
    long_description = desc.read()

setuptools.setup(
    name="Buffered.link",
    version="1.0.3",
    author="Josias Aurel",
    description="You text buffer CLI",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(),
    python_requires=">=3.6",
    py_modules=["bfdl"],
    install_requires=["requests", "rich"],
    author_email="josias@josiasw.dev"
)
