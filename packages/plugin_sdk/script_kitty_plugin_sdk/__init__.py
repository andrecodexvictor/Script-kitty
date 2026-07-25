from abc import ABC, abstractmethod
from typing import Dict, Any, List
from pydantic import BaseModel

class PluginMetadata(BaseModel):
    name: str
    version: str
    author: str
    description: str
    risk_level: str = "LOW"  # LOW, MEDIUM, HIGH

class BaseScannerPlugin(ABC):
    """Abstract Base Class for community exposure & discovery scanners."""

    @property
    @abstractmethod
    def metadata(self) -> PluginMetadata:
        pass

    @abstractmethod
    def scan(self, target: str) -> List[Dict[str, Any]]:
        """Executes passive discovery scan on target."""
        pass

class BaseValidatorPlugin(ABC):
    """Abstract Base Class for community vulnerability validators."""

    @property
    @abstractmethod
    def metadata(self) -> PluginMetadata:
        pass

    @abstractmethod
    def validate(self, target: str, finding_id: str, dry_run: bool = True) -> Dict[str, Any]:
        """Executes controlled verification flow."""
        pass

class PluginRegistry:
    """Central loader and manager for Script Kitty plugins."""

    def __init__(self):
        self.scanners: Dict[str, BaseScannerPlugin] = {}
        self.validators: Dict[str, BaseValidatorPlugin] = {}

    def register_scanner(self, plugin: BaseScannerPlugin):
        meta = plugin.metadata
        self.scanners[meta.name] = plugin
        print(f"📦 [Plugin SDK] Registered scanner plugin: {meta.name} v{meta.version}")

    def register_validator(self, plugin: BaseValidatorPlugin):
        meta = plugin.metadata
        self.validators[meta.name] = plugin
        print(f"📦 [Plugin SDK] Registered validator plugin: {meta.name} v{meta.version}")
