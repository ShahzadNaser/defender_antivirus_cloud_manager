from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in defender_antivirus_cloud_manager/__init__.py
from defender_antivirus_cloud_manager import __version__ as version

setup(
	name="defender_antivirus_cloud_manager",
	version=version,
	description="API based",
	author="Otgooneo",
	author_email="zubairmazhar23@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
